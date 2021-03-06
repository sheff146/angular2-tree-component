import { Component } from '@angular/core';
import { TreeComponent } from 'angular2-tree-component';

const CUSTOM_TEMPLATE_STRING = '{{ node.data.name }}';

@Component({
  selector: 'app',
  directives: [TreeComponent],
  styles: [
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  template: `<Tree
    #tree
    [nodes]="nodes"
    [focused]="true"
    [options]="customTemplateStringOptions"
    (onToggle)="onEvent($event)"
    (onActivate)="onEvent($event)"
    (onDeactivate)="onEvent($event)"
    (onActiveChanged)="onEvent($event)"
    (onFocus)="onEvent($event)"
    (onBlur)="onEvent($event)"
  ></Tree>
  <br>
  <p>Keys:</p>
  down | up | left | right | space | enter
  <p>API:</p>
  <button (click)="tree.treeModel.focusNextNode()">next node</button>
  <button (click)="tree.treeModel.focusPreviousNode()">previous node</button>
  <button (click)="tree.treeModel.focusDrillDown()">drill down</button>
  <button (click)="tree.treeModel.focusDrillUp()">drill up</button>
  <p></p>
  <button
    [disabled]="!tree.treeModel.focusedNode"
    (click)="tree.treeModel.focusedNode.toggleActivated()">
    {{ tree.treeModel.focusedNode?.isActive ? 'deactivate' : 'activate' }}
  </button>
  <button
    [disabled]="!tree.treeModel.focusedNode"
    (click)="tree.treeModel.focusedNode.toggle()">
    {{ tree.treeModel.focusedNode?.isExpanded ? 'collapse' : 'expand' }}
  </button>
  <button
    [disabled]="!tree.treeModel.focusedNode"
    (click)="tree.treeModel.focusedNode.blur()">
    blur
  </button>`
})
export class App {
  nodes = [
    {
      id: uuid(),
      expanded: true,
      name: 'root expanded',
      subTitle: 'the root',
      children: [
        {
          id: uuid(),
          name: 'child1',
          subTitle: 'a good child',
          hasChildren: false
        }, {
          id: uuid(),
          name: 'child2',
          subTitle: 'a bad child',
          hasChildren: false
        }
      ]
    },
    {
      id: uuid(),
      name: 'root2',
      subTitle: 'the second root',
      children: [
        {
          id: uuid(),
          name: 'child2.1',
          subTitle: 'new and improved',
          hasChildren: false
        }, {
          id: uuid(),
          name: 'child2.2',
          subTitle: 'new and improved2',
          children: [
            {
              id: uuid(),
              name: 'subsub',
              subTitle: 'subsub',
              hasChildren: false
            }
          ]
        }
      ]
    },
    {
      id: uuid(),
      name: 'asyncroot',
      hasChildren: true
    }
  ];

  asyncChildren = [
    {
      name: 'child2.1',
      subTitle: 'new and improved'
    }, {
      name: 'child2.2',
      subTitle: 'new and improved2'
    }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign(c, {
          hasChildren: node.level < 5,
          id: uuid()
        });
      })), 1000);
    });
  }

  customTemplateStringOptions = {
    treeNodeTemplate: CUSTOM_TEMPLATE_STRING,
    // treeNodeTemplate: MyTreeNodeTemplate,
    // displayField: 'subTitle',
    expandedField: 'expanded',
    loadingComponent: MyTreeLoadingTemplate,
    getChildren: this.getChildren.bind(this)
  }
  onEvent = ($event:any) => console.log($event);
}

@Component({
  template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
}

@Component({
  template: 'Loading, please hold....'
})
class MyTreeLoadingTemplate {
}

let id = 0;
function uuid() {
  id = id + 1;
  return id;
}
