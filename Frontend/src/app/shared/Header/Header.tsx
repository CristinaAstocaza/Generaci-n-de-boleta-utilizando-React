
import './header.scss'
function header(){
    return(
        <>
        <header className="sticky-top bg-white shadow-sm py-3">
                <nav className="container d-flex justify-content-between align-items-center">
                    <h1 className="fw-bold text-primary fs-3">MiFactura.pe</h1>
                    <ul className="nav d-none d-md-flex gap-4">
                        <li><a href="#body1" className="nav-link text-dark fw-semibold">Funcionalidades</a></li>
                        <li><a href="#body2" className="nav-link text-dark fw-semibold">Beneficios</a></li>
                        <li><a href="#body3" className="nav-link text-dark fw-semibold">Planes</a></li>
                        <li><a href="#" className="btn btn-outline-primary rounded-pill">📱 933 717 700</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default header;