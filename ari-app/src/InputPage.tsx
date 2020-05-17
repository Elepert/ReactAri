
import * as React from 'react';
// import ResourceList from '../components/ResourceList';
import { connect } from 'react-redux';
import { Form, Container, Col, Button } from 'react-bootstrap';
import './InputPage.scss';

import AddSlide from './AddSlide';

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
//     deleteResources: (resources: IResource[]) => dispatch(deleteResources(resources, false)),
//     deleteResourcesLocally: (resources: IResource[]) => dispatch(deleteResources(resources, true)),
//     viewResource: (resource: IResource) => dispatch(AppActions.viewResource(resource)),
//     createResource: (newResource: ICreateResourceRequest) => dispatch(createNewResource(newResource))
//   }
// };

// type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface Slide {
    content: string,
    comment: string,
}

interface PageState {
    title: string;
    author: string;
    titleComment: string;
    slides: Slide[];
}

type ReduxType = PageState;

/**
 * Component that puts together the main page where all of the user's resources are displayed
 */
class MainPage extends React.Component<any, PageState>  {

    constructor(props: any) {
        super(props);
        this.state = {
            title: "",
            author: "",
            titleComment: "",
            slides: [],
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.submitSlide = this.submitSlide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleSubmit (event: any) {
        const data = { slides: this.state.slides,
            title: this.state.title,
            author: this.state.author,
            titleComment: this.state.titleComment
        }
        fetch(`http://localhost:8888/`, {
            method: 'post', // or 'PUT'
            mode: 'no-cors',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.props.history.push('/video');
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        event.preventDefault();
        
    }

    submitSlide(content: string, comment: string) {
        this.setState({
            slides: [...this.state.slides, {
                    content: content,
                    comment: comment, 
                }]
        });
      }

    handleTextChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        switch (name) {
            case "title":
                this.setState({"title": value });
                break;
            case "author":
                this.setState({"author": value });
                break;
            case "title-slide-comments":
                this.setState({"titleComment": value });
                break;
            default:
                break;
        }
        
    }

    public render() {
        const slidesWaiting = this.state.slides.map((slide: Slide) => {
            return (<div className="slide">
                <p>{slide.content}</p>
                <p>{slide.comment}</p>
            </div>)
        })
        return (
            <div className = "input-page">
                <Container className="p-3">
                    <Form className="form-box">
                        <Form.Row className="content-row">
                            <Form.Label column sm={3}>
                                Presentation Title
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" name="title" placeholder="Presentation Title" onChange={this.handleTextChange}/>
                            </Col>
                        </Form.Row>
                        <Form.Row className="content-row">
                            <Form.Label column sm={3}>
                                Author
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" name="author" placeholder="John Doe" onChange={this.handleTextChange}/>
                            </Col>
                        </Form.Row>
                        <Form.Row className="content-row">
                            <Form.Label column sm={3}>
                                Title slide comments
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" name="title-slide-comments" placeholder="Comments" onChange={this.handleTextChange}/>
                            </Col>
                        </Form.Row>
                        
                        <AddSlide submitSlide={this.submitSlide} />
                        <Form.Row className="button-row">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit" onClick={this.handleSubmit}>Create Presentation</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                
                </Container>
                <div className="slides-waiting">
                    {slidesWaiting}
                </div>
            </div>
                
        )
    }

}

export default connect(
//   mapStateToProps,
//   mapDispatchToProps
)(MainPage);