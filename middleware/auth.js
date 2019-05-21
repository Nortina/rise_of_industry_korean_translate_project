export default function ({store, error}) {
    if (!store.state.authUser) {
        error({
            message: 'You shall not pass!',
            statusCode: 403
        })
    }
}