import { Link} from 'react-router-dom'
function BotaoLogin(){
    return(
        <Link to="/login">
        <button className="login-button">Login</button>
        </Link>

    )

}

export default BotaoLogin