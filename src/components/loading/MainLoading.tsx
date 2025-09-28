import { Main } from "next/document"

const MainLoading = () => {
    return (
        <div className="main-loading-spinner-container">
            <div className="main-loading-spinner">
                <span className="main-loading-spinner-ball"></span>
            </div>
        </div>
    )
}

export default MainLoading;