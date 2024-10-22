
export function Modal() {



    return(
        <div className="modal">
            <div className="container__modal">
                <h1 className="h1__molda">Remover produto do catálogo?</h1>
                <p className="p__modal">Esta ação não poderá ser desfeita.</p>
                <div className="container__modal--button">
                        <button className="button__modal--confir">manter produto</button>
                        <button className="button__modal--negativ">Remover</button>
                </div>
            </div>
        </div>
    )
}