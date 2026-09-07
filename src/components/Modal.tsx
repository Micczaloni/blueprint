type ModalProps = {
    children: React.ReactNode
    onClose: () => void
}

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-[9999]"
            onClick={onClose}>
            <div
                className="relative bg-white p-6 rounded-md w-full max-w-[500px]"
                onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-2 right-2 px-2 py-1 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
                    onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
}

export default Modal