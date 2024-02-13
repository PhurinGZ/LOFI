import './Overlay.scss';

const Overlay = ({ size }) => {
    const overlayElements = new Array(size)
        .fill()
        .map((_, i) => <div key={i} className="overlay" />);

    return overlayElements;
};

export default Overlay;
