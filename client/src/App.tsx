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

const helpers = [
    {id: 1, name: "Bob"},
    {id: 2, name: "Mary"},
    {id: 3, name: "Joe"},
    {id: 4, name: "Fred"},
    {id: 5, name: "Lucinda"},
    {id: 6, name: "Mallea"}
];

const help = [
    {giving: 1, receiving: 3, what: "Food"},
    {giving: 2, receiving: 4, what: "Money"},
    {giving: 3, receiving: 5, what: "Emotional Support"},
    {giving: 3, receiving: 6, what: "Rent Assistance"}
];

const nodes: Map<number, any> = new Map();
const links: Array<any> = [];

const handler = (event) => {
    console.log(event);
}

const toRadians =  (angle) => {
    return angle * (Math.PI / 180);
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

    const rotationPerHelper = 360 / helpers.length;

    helpers.forEach((helper, index) => {
        const node = new DefaultNodeModel({
            name: helper.name,
            color: 'rgb(0,0,0)'
        });

        const radius = 100;
        const x = radius *  Math.cos(toRadians(rotationPerHelper * index));
        const y = radius *  Math.sin(toRadians(rotationPerHelper * index));

        node.setPosition(100 + x, 100 + y);
        nodes.set(helper.id, node);
    });

    help.forEach((help, index) => {
        const givingNode = nodes.get(help.giving);
        const receivingNode = nodes.get(help.receiving);
        const givingHelper = helpers.find((helper) => {
            return helper.id === help.giving
        });
        const receivingHelper = helpers.find((helper) => {
            return helper.id === help.receiving
        });
        const givingPort = givingNode.addOutPort('To ' + receivingHelper.name);
        const receivingPort = receivingNode.addInPort('From ' + givingHelper.name);
        const link = new DefaultLinkModel();

        link.setSourcePort(givingPort);
        link.setTargetPort(receivingPort);
        link.addLabel(new DefaultLabelModel({label: help.what}));

        links.push(link);
    });

    // const node1 = new DefaultNodeModel({
    //     name: 'Node 1',
    //     color: 'rgb(0,0,0)',
    // });
    // node1.setPosition(100, 100);
    // let port1 = node1.addOutPort('Out');
    //
    // const node2 = new DefaultNodeModel({
    //     name: 'Node 2',
    //     color: 'rgb(0,192,255)',
    // });
    // node2.setPosition(300, 100);
    // let port2 = node2.addInPort('In');
    // let port3 = node2.addOutPort('Out');
    //
    // const link1 = new DefaultLinkModel();
    // link1.setSourcePort(node1.getPort('Out'));
    // link1.setTargetPort(node2.getPort('In'));
    //
    // link1.addLabel(new DefaultLabelModel({label: 'testing'}));

    const models = model.addAll(...nodes.values(), ...links);

    models.forEach((item) => {
        item.registerListener({
            eventDidFire: handler
        });
    });

    model.registerListener({
        eventDidFire: handler
    });

    // port1.registerListener({
    //     eventDidFire: handler
    // });
    //
    // port2.registerListener({
    //     eventDidFire: handler
    // });

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

