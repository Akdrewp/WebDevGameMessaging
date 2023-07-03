import { Navigate } from "react-router-dom";

function HomePage() {
    let isLogggedIn = false;
    if (isLogggedIn === false) {
        return (
            <Navigate to="/login" />
        )
    }
    else {
        return (
            <div> Hello </div>
        );
    }
}

export default HomePage;