import {createHashRouter, Navigate} from "react-router-dom";
import {HomePage} from "../../Pages/HomePage";
import {MainLayout} from "../Components/Layouts/MainLayout/MainLayout";
import {PlayerScenarioLayout} from "../Components/Layouts/PlayerScenarioLayout/PlayerScenarioLayout";
import {PlayerScenarioPage} from "../../Pages/PlayerScenarioPage";
import {TestSpeechSynthesisPage} from "../../Pages/TestSpeechSynthesisPage";
import {TmpPage} from "../../Pages/TmpPage";
import {AppLoader} from "../Components/AppLoader";


const router = createHashRouter([
    {
        path: "/", element: <AppLoader/>, children: [
            {
                path: "/", element: <MainLayout/>, children: [
                    {index: true, element: <Navigate to={"test"} replace/>},
                    {path: "home", element: <HomePage/>},
                    {path: "tmp", element: <TmpPage/>}
                ]
            },
            {
                path: "/", element: <PlayerScenarioLayout/>, children: [
                    {path: "english/:id/:scenarioId", element: <PlayerScenarioPage/>},
                    {path: "test", element: <TestSpeechSynthesisPage/>},
                ]
            },
            {path: "*", element: <h1>NoPage</h1>}
        ]
    },

])

export {router};