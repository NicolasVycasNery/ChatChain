import { scaleRotate as Menu } from 'react-burger-menu';
import {
    Link
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { menuState } from '../../store/BurgerMenuContext';

export function MenuUI() {
    const [isOpen, setIsOpen] = useRecoilState(menuState);
    return (
        <Menu className='bg-gray-950 text-white overflow-hidden'
            pageWrapId={"main"}
            isOpen={isOpen}
            outerContainerId={"main"}
            animation="push"
            right
        >
            <Link className="bg-gray-900 hover:bg-gray-800 p-2 border-b border-gray-800" to="/">
                Chat
            </Link>
            <Link className="bg-gray-900 hover:bg-gray-800 p-2 border-b border-gray-800" to="/about">
                About
            </Link>
        </Menu>
    )
}