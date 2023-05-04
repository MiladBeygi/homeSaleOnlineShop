const Card = (props) => {
    const { title, description } = props;
    return <>
        <div>
            {title}
            {description}
        </div>
    </>
}
export default Card;