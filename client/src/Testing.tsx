/// <reference no-default-lib="true"/>
import * as React from 'react';

import styled from '@emotion/styled';
import {DemoCanvasWidget} from "./DemoCanvasWidget";
import createEngine, {DiagramModel} from "@projectstorm/react-diagrams";
import {CanvasWidget} from "@projectstorm/react-canvas-core";

export const FullscreenCanvas = styled(DemoCanvasWidget)`
  height: 100%;
  width: 100%;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default class Testing extends React.Component {

    render() {
        const engine = createEngine();
        const model = new DiagramModel();
        engine.setModel(model);

        return (
            <Container>
                <p data-testid={"testing"}>testing</p>
            </Container>
        );
    }
}


