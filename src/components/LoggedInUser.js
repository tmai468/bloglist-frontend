const LoggedInUser = (props) => {
    const { name, setUser } = props
    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUserJSON')
        setUser(null)
        
    }
    return (
        <div>
            <p>
            {name} logged in
            <button onClick={handleLogout}>logout</button>
            </p>
        </div>
    )
}

export default LoggedInUser