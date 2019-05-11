import express from 'express'
import fs from 'fs'
import { Data } from './db/schema'
import { callbackify } from 'util';

const app = express()

app.post('/datas/reset', async (req, res) => {

    // Data.find((err, res) => {
    //     res.forEach(item => {
    //         // const type = item._id.split('.')[0].toLowerCase()

    //         Data.updateOne({ _id: item._id }, {
    //             $set: { isAccepted: false }
    //         }, () => {
    //             // console.log('done')
    //         })
    //     })
    // })

    // fs.readFile('./static/old.lang', (err, buffer) => {
    //     if (err) {
    //         console.error(err)
    //         res.status('500').end()
    //     }

    //     console.log('file read')

    //     const lines = buffer.toString('utf8').split('\r\n')
    //     for (let i in lines) {
    //         let line = lines[i]
    //         let data = line.split('\t')

    //         if (data.length != 4) {
    //             continue
    //         }

    //         const id = data[0]

    //         if (data[2] == data[3]) {
    //             continue
    //         }

    //         Data.updateOne(
    //             {
    //                 _id: id,
    //             },
    //             {
    //                 bestTranslate: data[3],
    //                 translatedText: [
    //                     {
    //                         text: data[3],
    //                     }
    //                 ],
    //             }, (err, raw) => {
    //                 if (err) {
    //                     console.error(err)
    //                 }
    //             })
    //     }

    // })

    // fs.readFile('./static/new.lang', (err, buffer) => {
    //     if (err) {
    //         console.error(err)
    //         res.status('500').end()
    //     }

    //     const lines = buffer.toString('utf8').split('\r\n')

    //     for (let i in lines) {
    //         let line = lines[i]
    //         let data = line.split('\t')

    //         if (data.length != 4) {
    //             continue
    //         }

    //         const id = data[0]

    //         Data.findById(id, (err, res) => {
    //             if (err) {
    //                 Data.create({
    //                     _id: id,
    //                     maxLength: parseInt(data[1]),
    //                     originalText: data[2],
    //                     bestTranslate: '',
    //                     translatedText: [],
    //                     registerTime: new Date(),
    //                 })
    //             }
    //             else {
    //                 Data.updateOne(
    //                     {
    //                         _id: id,
    //                     }, {
    //                         bestTranslate: '',
    //                         translatedText: [],
    //                     })
    //             }
    //         })
    //     }
    // })

    res.status('200').end()
    return
})

app.get('/datas', (req, res) => {
    const type = req.query['type']

    Data.find({ type }, (err, datas) => {
        if (err) {
            console.error(err)
            res.status('500').end()
        }

        res.json(datas)
    })
})

app.get('/datas/types', (req, res) => {
    Data.aggregate([
        {
            $project: {
                type: '$type',
                isTranslated: {
                    $cond: [{
                        $ne: ['$bestTranslate', '']
                    }, 1, 0]
                },
                isAccepted: {
                    $cond: ['$isAccepted', 1, 0]
                }
            }
        },
        {
            $group: {
                _id: '$type',
                totalCount: { $sum: 1 },
                translatedCount: { $sum: '$isTranslated' },
                acceptedCount: { $sum: '$isAccepted' },
            }
        }
    ], (err, types) => {
        if (err) {
            console.error(err)
            res.status('500').end()
        }

        res.json(types)
    })
})

module.exports = {
    path: '/api',
    handler: app
}