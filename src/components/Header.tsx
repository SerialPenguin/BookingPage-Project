import "../stylesheet/components/_Header.scss"

function Header():JSX.Element{
return(
    <header>
        <div className="header-wrapper">
        <img src="/assets/hantel.jpeg" alt="Hantel" />

        <h1>Strong n' Epic</h1>
        </div>
    </header>
)
}

export default Header;