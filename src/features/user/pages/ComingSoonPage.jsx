import "./ComingSoonPage.css";

export function ComingSoonPage({ title, description }) {
    return (
        <div className="coming-soon">
            <div className="coming-soon__card">
                <div className="coming-soon__title">{title}</div>
                <p className="coming-soon__desc">{description}</p>
            </div>
        </div>
    );
}