import Auth from '../auth/Auth'

function UserSpace() {
    return (
        <div className="user-space d-flex flex-column flex-lg-row gap-2">
            <Auth>
                {({ login, register }) => (
                    <>
                        <button
                            type="button"
                            className="app-action-button app-action-button--outline"
                            onClick={login}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="app-action-button"
                            onClick={register}
                        >
                            Sign-up
                        </button>
                    </>
                )}
            </Auth>
        </div>
    )
}

export default UserSpace