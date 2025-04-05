
export interface ButtonProps {
    buttonName: string;
    buttonType: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}