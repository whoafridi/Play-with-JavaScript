const Result = (props) => {
    //console.log(props.repo);
    const {login,name, location,bio, avatar_url} = props.repo;
    return (
        <div>
            <img src={avatar_url} alt={name} />
            <h1>{name}</h1>
            <h2>{location}</h2>
            <h4>
                {bio}
            </h4>
            <h5>
                {login}
            </h5>
        </div>
    )
}

export default Result;