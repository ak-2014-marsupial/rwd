import React, {useState} from "react"
import {HoldButton, Toast} from "../../shared";


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, errorMessage: ''};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true, errorMessage: error.message};
    }

    componentDidCatch(error, errorInfo) {
        // console.error("Ошибка поймана в ErrorBoundary: ", error, errorInfo);
    }

    resetError = () => {
        this.setState({hasError: false, errorMessage: ''});
    };

    handleClick = (e) => {
        // this.resetError()
    }

    render() {
        if (this.state.hasError) {

            return (
                <div style={{background: "lightblue", width: "100%", height: "100dvh"}}
                     onClick={this.handleClick}>
                    <div onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <Toast
                            isOpen={true}
                            message={{message: this.state.errorMessage, type: "error"}}
                            onClose={this.resetError}
                            duration={5}
                        />
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}


// Пример компонента, который может выбросить ошибку
function BuggyComponent() {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(p => p += 1)
    }

    if (count === 2) throw new Error("NNNNNNNN " + count)
    // useThrowError(count)

    return (
        <>
            <div>Этот компонент работает нормально.</div>
            <HoldButton onAction={increment}
                        style={{fontSize: "1.2rem", color: "white", background: "blue"}}>Error {count}
            </HoldButton>
        </>
    )
}

export {ErrorBoundary, BuggyComponent}