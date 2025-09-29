import { Main } from "next/document"

const MainLoading = () => {
    return (
        <div className="w-full h-screen">
            <div className="main-loading-spinner-container">
                <div className="main-loading-spinner">
                    <span className="main-loading-spinner-ball"></span>
                </div>
            </div>
        </div>
    )
}

export default MainLoading;