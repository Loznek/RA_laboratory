import {Link} from "react-router-dom";

export const GalaxyFront = () => {
    return (
        <div>
            <h1>Galaxy Front</h1>
            <Link to={`/admin/Jedi`}>To Jedis</Link>
        </div>
    );
}