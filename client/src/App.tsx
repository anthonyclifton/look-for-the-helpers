/// <reference no-default-lib="true"/>
import * as React from 'react';

import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel
} from '@projectstorm/react-diagrams';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget} from "./DemoCanvasWidget";
import styled from "@emotion/styled";
import {LabelModel, LabelModelGenerics} from "@projectstorm/react-diagrams-core";

const App = () => {
    const FullscreenCanvas = styled(DemoCanvasWidget)`
  height: 100%;
  width: 100%;
`;

    const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

    // create an instance of the engine with all the defaults
    const engine = createEngine();

    // node 1
    const node1 = new DefaultNodeModel({
        name: 'Node 1',
        color: 'rgb(0,0,0)',
    });
    node1.setPosition(100, 100);
    let port1 = node1.addOutPort('Out');

    // node 2
    const node2 = new DefaultNodeModel({
        name: 'Node 2',
        color: 'rgb(0,192,255)',
    });
    node2.setPosition(300, 100);
    let port2 = node2.addInPort('In');
    let port3 = node2.addOutPort('Out');

    // link them and add a label to the link
    const link = port1.link<DefaultLinkModel>(port2);
    // console.log(link);
    // link.addLabel(new LabelModel<LabelModelGenerics>());

    const model = new DiagramModel();
    model.addAll(node1, node2, link);
    engine.setModel(model);

  return (
      <Container>
          <FullscreenCanvas>
            <CanvasWidget engine={engine} />
          </FullscreenCanvas>
      </Container>
  );
}

export default App;

