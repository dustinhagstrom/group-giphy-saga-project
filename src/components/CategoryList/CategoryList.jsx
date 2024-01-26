import { useHistory } from "react-router-dom"

export default function CategoryList () {
    const history = useHistory();

    const navigateHome = () => {
        history.push("/");
    }

    return (
        <>
        <h1>Hi From CategoryList</h1>
        <button onClick={navigateHome}>Go Home</button></>
    )
}