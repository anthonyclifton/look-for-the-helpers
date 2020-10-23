/// <reference no-default-lib="true"/>
import * as React from 'react';

import createEngine, {
    DefaultLabelModel,
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel
} from '@projectstorm/react-diagrams';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget} from "./DemoCanvasWidget";
import styled from "@emotion/styled";

const handler = (event) => {
    console.log(event);
}

const App = () => {
    const FullscreenCanvas = styled(DemoCanvasWidget)`
  height: 100%;
  width: 100%;
`;

    const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

    const engine = createEngine();
    const model = new DiagramModel();

    const node1 = new DefaultNodeModel({
        name: 'Node 1',
        color: 'rgb(0,0,0)',
    });
    node1.setPosition(100, 100);
    let port1 = node1.addOutPort('Out');

    const node2 = new DefaultNodeModel({
        name: 'Node 2',
        color: 'rgb(0,192,255)',
    });
    node2.setPosition(300, 100);
    let port2 = node2.addInPort('In');
    let port3 = node2.addOutPort('Out');

    const link1 = new DefaultLinkModel();
    link1.setSourcePort(node1.getPort('Out'));
    link1.setTargetPort(node2.getPort('In'));

    link1.addLabel(new DefaultLabelModel({label: 'testing'}));

    const models = model.addAll(node1, node2, link1);

    models.forEach((item) => {
        item.registerListener({
            eventDidFire: handler
        });
    });

    model.registerListener({
        eventDidFire: handler
    });

    port1.registerListener({
        eventDidFire: handler
    });

    port2.registerListener({
        eventDidFire: handler
    });

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

