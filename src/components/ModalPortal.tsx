import { createPortal } from "react-dom";
import styled from "styled-components";
import { useThemeStore } from "../store/themeStore";
import type { ReactNode } from "react";

type ModalType = {
    isDark: boolean;
};

const ModalWrapper = styled.div<ModalType>`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: ${({isDark}) => isDark ? 'rgba(29, 29, 29, 0.7)' : 'rgba(51, 51, 51, 0.5)'};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function ModalPortal({children}: {children:ReactNode}) {
    const isDark = useThemeStore((store) => store.isDark);
    const modalArea = document.getElementById('modal')!
    return createPortal(<ModalWrapper isDark={isDark}>{children}</ModalWrapper>, modalArea)
}