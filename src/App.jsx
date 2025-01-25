import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowComments from "./screens/ShowComments";
import Dashboard from "./screens/Dashboard";

const AppContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const App = () => {
    return (
        <Router>
            <AppContainer>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/show" element={<ShowComments />} />
                </Routes>
            </AppContainer>
        </Router>
    );
};

export default App;
