import React from 'react';
import withRouter from './withRouter';
import { Link } from "react-router-dom";
import { Card, Col, Row, PageHeader, Descriptions, Typography, Button  } from 'antd';

class ResultadosBusquedaPag extends React.Component {

    constructor(props) {
        super(props)
        this.idResultados = this.props.params.string;
        this.state = {
            publicaciones : []
        }
        this.getPublicaciones();
    }

    getPublicaciones = async () => {
        let resultados = [];
        for (let i = 0; i < this.idResultados.length; i += 2) {
            const { data, error } = await this.props.supabase
            .from('publicaciones')
            .select()
            .eq('id', this.idResultados.substring(i, i+2))
  
            if ( error == null && data.length > 0) {
                resultados.push(data[0]);
            }
        }   
        if (resultados != []) {                
            this.setState({
                publicaciones : resultados
            })
        }
    }

    render() {
        const imgStyle = {
            height: "23em",
            width: "100%"
        };
        const cardStyle = {
            height: "100%"
        };        
        const { Title } = Typography;
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        return (
            <PageHeader ghost={false}>
                <Descriptions>
                    <Descriptions.Item span={3}><Title level={4}>Resultados de la búsqueda</Title></Descriptions.Item>
                    <Descriptions.Item span={3}>
                        <Row gutter={ [16, 16] } >
                            { this.state.publicaciones.map( publicacion => {
                                publicacion.linkTo = "/" + publicacion.categoria + "/" + publicacion.id;
                                let image = <img alt={"Imagen por defecto"} src={process.env.REACT_APP_SUPBASE_STORAGE + "imageMockup.png"} style={imgStyle}/>
                                if ( publicacion.imagen != null ){
                                    image = <img alt={publicacion.descripcion_imagen} src={process.env.REACT_APP_SUPBASE_STORAGE + publicacion.imagen} style={imgStyle}/> 
                                }
                                const parts = publicacion.fecha_publicacion.split("-");
                                let stringFecha = parts[2] + " de " + meses[parts[1] - 1] + " de " + parts[0];
                                return ( 
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                                        <Link to={ publicacion.linkTo }>
                                            <Card hoverable key={publicacion.id} title={publicacion.titulo} style={cardStyle} 
                                                cover={image}>
                                                <p><i>{stringFecha}</i></p>
                                                <p>{publicacion.descripcion_breve}</p>
                                                <Button type="secondary">Leer más...</Button>
                                            </Card>
                                        </Link>
                                    </Col>  
                                )
                            })}
                        </Row>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
        )
    }
}

export default withRouter(ResultadosBusquedaPag);