import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface AdPopupProps {
    delay: number;
    position: 'center' | 'bottom-right';
    imageUrl: string;
    link: string;
}

export default function AdPopup({ delay, position, imageUrl, link }: AdPopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
    const timer = setTimeout(() => {
        setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
    }, [delay]);

    const positionClasses = {
        'center': 'fixed inset-0 z-50 overflow-y-auto',
        'bottom-right': 'fixed bottom-4 right-4 z-50'
    };

    return (
        <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={positionClasses[position]}
    >
        <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsOpen(false)}
            >
                <X className="h-6 w-6" />
            </button>
            </div>

            <a href={link} target="_blank" rel="noopener noreferrer">
                <img
                src={imageUrl}
                alt="Advertisement"
                className="w-full h-auto rounded-lg"
            />
            </a>
            </div>
        </div>
    </Dialog>
    );
}