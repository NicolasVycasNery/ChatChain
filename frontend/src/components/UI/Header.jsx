
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { menuState } from '../../store/BurgerMenuContext';
import PropTypes from 'prop-types';

function BurgerIcon({
    width = "36px",
    height = "36px",
}) {
    return (
        <div style={{
            width,
            height,
            background: 'transparent',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
            }} >
                <span style={{
                    display: 'block',
                    width: '100%',
                    height: '25%',
                    background: 'white',
                    borderRadius: '2px'
                }} className="bg-white block" />
                <span style={{
                    display: 'block',
                    width: '100%',
                    height: '25%',
                    background: 'white',
                    borderRadius: '2px'
                }} className="bg-white block" />
                <span style={{
                    display: 'block',
                    width: '100%',
                    height: '25%',
                    background: 'white',
                    borderRadius: '2px'
                }} className="bg-white block" />
            </div>

        </div>
    );
}

BurgerIcon.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
};


function Header() {
    const [isOpen, setIsOpen] = useRecoilState(menuState);
    return (
        <header className="bg-gray-950 text-white p-4 shadow-lg sticky top-0 z-10">
            <div className="flex justify-between">
                <div className="flex justify-between flex-col">
                    <Link to="/" className="text-2xl">
                        Chat DApp
                    </Link>
                </div>
                <div className="flex justify-between m-2">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <BurgerIcon />
                    </button>
                </div>
            </div>
            <div>

            </div>
        </header>
    );
}

export { Header };

/**

 */