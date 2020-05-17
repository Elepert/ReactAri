
import * as React from 'react';
// import ResourceList from '../components/ResourceList';
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import './AddSlide.scss';

// import { ThunkDispatch } from "redux-thunk";

// import * as AppActions from '../store/actions/App';
// import {
//   createNewResource,
//   deleteResources,
// } from '../store/async-actions';
// import {
//   FileOrFolderTypes
// } from './store/types';

// const mapStateToProps = ({ resources }: IRootState) => {
//   return {
//     resources: resources.allResources,
//     fetchingResources: resources.fetchingResources,
//   };
// };

// const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
//   return {
//     submitSlide: (content: string, comment: string) => dispatch(deleteResources(resources, false)),
//   }
// };

interface SlideProps {
    submitSlide: (content: string, comment: string) => any;
}

// type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface SlideState {
    content: string,
    comment: string,
}

type ReduxType = SlideState;

/**
 * Component that puts together the main page where all of the user's resources are displayed
 */
class AddSlide extends React.Component<SlideProps, SlideState>  {

    constructor(props: any) {
        super(props);
        this.state = {
            content: "",
            comment: "",
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event: any) {
        this.props.submitSlide(this.state.content, this.state.comment);
        this.setState({
            content: "",
            comment: "",
        })
        event.preventDefault();
      }

    handleTextChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === "content") {
            this.setState({
                content: value });
        } else {
            this.setState({
                comment: value});
        }
        
    }

    public render() {
        return (
            <Form className="slide-form-box">
                <Form.Row className="content-row">
                    <Form.Label column sm={3}>
                        Slide Content
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control value={this.state.content} name="content" as="textarea" onChange={this.handleTextChange}/>
                    </Col>
                </Form.Row>
                <Form.Row className="content-row">
                    <Form.Label column sm={3}>
                        Slide Comments
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control value={this.state.comment} name="comment" as="textarea" onChange={this.handleTextChange}/>
                    </Col>
                </Form.Row>
                <Form.Row className="button-row">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit" onClick={this.handleSubmit}>Add slide</Button>
                    </Col>
                </Form.Row>
            </Form>
        )
    }

}

export default connect(
//   mapStateToProps,
//   mapDispatchToProps
)(AddSlide);