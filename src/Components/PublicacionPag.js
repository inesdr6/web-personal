import React from 'react';
import withRouter from './withRouter';
import { PageHeader, Descriptions, Image, Typography } from 'antd';
import ReactPlayer from 'react-player';

class PublicacionPag extends React.Component {

    constructor(props) {
        super(props)
        this.id = this.props.params.id;
        this.categoria = this.props.params.categoria;
        this.state = {
            publicacion : {}
        }
        this.getPublicacion();      
    }
  
    getPublicacion = async () => {
        const { data, error } = await this.props.supabase
            .from(this.categoria)
            .select(`*, publi:publicaciones(*)`)            
            .eq('publicacion_id', this.id)
  
        if ( error == null && data.length > 0) {
            this.setState({
                publicacion : data[0]
            }) 
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.id = nextProps.params.id;
            this.categoria = nextProps.params.categoria;
            this.getPublicacion();
        }
    }
  
    render() {
        const imgStyle = {
            width: "50%",
            height: "100%"
        };        
        const { Title } = Typography;

        let image = process.env.REACT_APP_SUPBASE_STORAGE + "imageMockup.png";
        if (this.state.publicacion.publi?.imagen != null) {
            image = process.env.REACT_APP_SUPBASE_STORAGE + this.state.publicacion.publi?.imagen;
        }

        if (this.categoria == "aficiones") {
            return (
                <PageHeader ghost={false}>
                    <Descriptions>
                    <Descriptions.Item span={3}><Title level={4}>{this.state.publicacion.publi?.titulo}</Title></Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <Image src={image} alt={this.state.publicacion.publi?.descripcion_imagen} style={imgStyle}/>
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>{this.state.publicacion.descripcion_general}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            )
        }
        else if (this.categoria == "musica") {
            var arrayAlbumes = this.state.publicacion.albumes?.split(',');
            let textAlb = arrayAlbumes?.shift();
            return (
                <PageHeader ghost={false}>
                    <Descriptions>
                        <Descriptions.Item span={3}><Title level={4}>{this.state.publicacion.publi?.titulo}</Title></Descriptions.Item>
                        <Descriptions.Item span={3}>{this.state.publicacion.descripcion_general}</Descriptions.Item>
                        <Descriptions.Item span={3}>{textAlb}</Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <ul>
                                {arrayAlbumes?.map(album => <li>{album}</li>)}
                            </ul>
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>{this.state.publicacion.cancion_favorita}</Descriptions.Item>
                        <Descriptions.Item>
                            <ReactPlayer url={process.env.REACT_APP_SUPBASE_STORAGE + this.state.publicacion.video} alt={this.state.publicacion.descripcion_video} 
                            width='100%' height='100%' controls/>
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            )
        }
        else if (this.categoria == "recetas") {
            var arrayIngredientes = this.state.publicacion.ingredientes?.split(',');
            let textIng = arrayIngredientes?.shift();
            return (
                <PageHeader ghost={false}>
                    <Descriptions>
                        <Descriptions.Item span={3}><Title level={4}>{this.state.publicacion.publi?.titulo}</Title></Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <Image src={image} alt={this.state.publicacion.publi?.descripcion_imagen} style={imgStyle}/>
                            </Descriptions.Item>
                        <Descriptions.Item span={3}><Title level={5}>Ingredientes</Title></Descriptions.Item>
                        <Descriptions.Item span={3}>{textIng}</Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <ul>
                                {arrayIngredientes?.map(ingrediente => <li>{ingrediente}</li>)}
                            </ul>
                        </Descriptions.Item>
                        <Descriptions.Item span={3}><Title level={5}>Procedimiento</Title></Descriptions.Item>
                        <Descriptions.Item span={3}>{this.state.publicacion.procedimiento}</Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            )
        }
    }
}

export default withRouter(PublicacionPag);