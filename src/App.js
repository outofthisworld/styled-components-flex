import React, { Component } from "react";
import * as globalStyles from "./global-css.js";
import styled from "styled-components";
import { Envelope } from "styled-icons/fa-regular/Envelope";

const DefaultButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  background: orange;
`;

const YellowButton = DefaultButton.extend`background: yellow;`;

const RedButton = YellowButton.extend`background: red;`;
const Flex = styled.div`
  box-sizing:border-box;
  display:flex;
  border:0px;
  outline:0px;
  background:${props => props.background || "transparent"};
  color:${props => props.color || "inherit"};
  padding:${props => props.padding || "0px"};
  margin:${props => props.margin || "0px"};
  flex-direction:${props => props.direction || "row"};
  ${props => (props.width ? `width:${props.width}` : null)}
  ${props => (props.height ? `height:${props.height}` : null)}
  justify-content:${props => props.justify || "center"};
  align-items:${props => props.align || "stretch"};
  <!--only when flex-wrap:wrap-->
  align-content:${props => props.align || "stretch"};
  flex-wrap:${props => props.wrap || "initial"};
  flex-grow:${props => props.grow || "1"};
  flex-shrink:${props => props.shrink || "1"};
  ${props => (props.basis ? `flex-basis:${props.basis}` : null)}
  ${props => props.extend || null}
  ${props=>{
      if(!props.gap){
        return;
      }
      let css = '';
      /*Check props.extend to make sure they haven't defined their own css */
      if(props.direction === 'column' || props.wrap === 'wrap'){
        css += `padding-top:${props.gap};`;
      }else if(props.direction !== 'column' && props.wrap !== 'wrap'){
        css += `padding-left:${props.gap};`;
      }
      const styles = `
        & > ${props.childSelector || '*'}:not(:first-child){
            ${css};
        }
      `
      return styles;
  }}
  ${props =>{
      if(!props.childCss && !props.childExtend){
        return null;
      }
      let css = ``;

      css += props.childExtend || '';
      css += props.childCss && Object.keys(props.childCss).reduce((accum,next)=>{
        return accum + next + ':' + props.childCss[next] + ';'
      },'') || '';

      let selector = `& > ${props.childSelector || '*'} {
          ${css}
      }`;
      return selector;
    }
  }
`;

const FlexEnvelope = Envelope.extend`
  z-index: 10;
  flex-grow: 1;
`;
console.dir(FlexEnvelope)
console.dir(Flex)


const StyledMerge = function(component,componentTwo){
  component.componentStyle.rules = component.componentStyle.rules
  .concat(componentTwo.componentStyle.rules);

  console.dir(component)

  return component;
}

const Fle = StyledMerge(FlexEnvelope,Flex);

const Container = styled.div`
  width: ${props => props.width || "80%"};
  margin: ${props => props.margin || "0 auto"};
  max-width: ${props => props.max || "1280px"};
`;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Flex height={'50px'} gap={'1rem'}>
            <Flex grow={2} background={'orange'} align={"center"} justify={"center"}>
              <p>Hello</p>
            </Flex>
            <Flex align={"center"} justify={"center"}>
              This is content two
            </Flex>
            <Flex
              gap={'1rem'}
              margin={"0px 0px 0px 0px"}
            >
              <Fle grow={3}/>
              <Fle />
              <Fle />
              <Fle />
            </Flex>
          </Flex>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
