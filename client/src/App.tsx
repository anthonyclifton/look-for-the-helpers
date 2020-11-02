/// <reference no-default-lib="true"/>
import * as React from 'react';
import * as SRD from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget} from "./DemoCanvasWidget";
import styled from "@emotion/styled";

const FullscreenCanvas = styled(DemoCanvasWidget)`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default class App extends React.Component<any, any>{
    protected activeModel: SRD.DiagramModel;
    protected diagramEngine: SRD.DiagramEngine;

    private nodes: Map<number, any> = new Map();
    private links: Array<any> = [];

    private helpers: Array<any> = [
        {id: 1, name: "Bob"},
        {id: 2, name: "Mary"},
        {id: 3, name: "Fred"}
    ];

    private help: Array<any> = [
        {giving: 1, receiving: 2, what: "Food"},
        {giving: 2, receiving: 3, what: "Medical Assistance"}
    ];

    constructor() {
        super();
        this.diagramEngine = SRD.default();
        this.initializeModel();
    }

    public render() {
        return (
            <Container>
                <p data-testid={"header"}>look-for-the-helpers</p>
                <FullscreenCanvas>
                    <CanvasWidget engine={this.diagramEngine}/>
                </FullscreenCanvas>
            </Container>
        );
    }

    private initializeModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setModel(this.activeModel);

        this.helpers.forEach((helper, index) => {
            const node = new SRD.DefaultNodeModel({
                name: helper.name,
                color: 'rgb(0,0,0)'
            });

            const x = 100 + index * 100;
            const y = 100 + index * 100;

            node.setPosition(100 + x, 100 + y);
            this.nodes.set(helper.id, node);
        });

        this.help.forEach((help, index) => {
            const givingNode = this.nodes.get(help.giving);
            const receivingNode = this.nodes.get(help.receiving);
            const givingHelper = this.helpers.find((helper) => {
                return helper.id === help.giving
            });
            const receivingHelper = this.helpers.find((helper) => {
                return helper.id === help.receiving
            });
            const givingPort = givingNode.addOutPort('To ' + receivingHelper.name);
            const receivingPort = receivingNode.addInPort('From ' + givingHelper.name);
            const link = new SRD.DefaultLinkModel();

            link.setSourcePort(givingPort);
            link.setTargetPort(receivingPort);
            link.addLabel(new SRD.DefaultLabelModel({label: help.what}));

            this.links.push(link);
        });

        const models = this.activeModel.addAll(...this.nodes.values(), ...this.links);

        models.forEach((item) => {
            item.registerListener({
                eventDidFire: this.handleEvent
            });
        });

        this.activeModel.registerListener({
            eventDidFire: this.handleEvent
        });

        this.activeModel.addAll(models);
    }

    private handleEvent (event) {
        console.log(event);
    };
}


