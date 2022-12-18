import React from 'react';
import { Link } from "react-router-dom";
import { Card, Col, Row, PageHeader, Descriptions, Typography, Button } from 'antd';

class RecetasPag extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            publicaciones : []
        }  
        this.getPublicaciones();
    }

    getPublicaciones = async () => {
        const { data, error } = await this.props.supabase
            .from('publicaciones')
            .select()
            .order('fecha_publicacion')
            .eq('categoria', 'recetas')
  
        if ( error == null) {
            this.setState({
                publicaciones : data
            }) 
        }
    }

    render() {
        const cardStyle = {
            height: "100%"
        };
        const { Title } = Typography;
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        return (
            <div>
                <PageHeader ghost={false}>
                    <Descriptions>
                        <Descriptions.Item span={3}><Title level={4}>Recetas</Title></Descriptions.Item>
                        <Descriptions.Item span={3}>Desde pequeña cocino y considero que tengo mano para ello, por lo que he cocinado platos muy variados. Entre mis recetas favoritas se encuentran las publicadas en esta sección.</Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <Row gutter={ [30, 30] }>
                                { this.state.publicaciones.map( publicacion => {
                                    publicacion.linkTo = "/recetas/" + publicacion.id;
                                    let image = <img alt={"Imagen por defecto"} src={process.env.REACT_APP_SUPBASE_STORAGE + "imageMockup.png"}/>
                                    if ( publicacion.imagen != null ){
                                        image = <img alt={publicacion.descripcion_imagen} src={process.env.REACT_APP_SUPBASE_STORAGE + publicacion.imagen}/> 
                                    }
                                    const parts = publicacion.fecha_publicacion.split("-");
                                    let stringFecha = parts[2] + " de " + meses[parts[1] - 1] + " de " + parts[0];
                                    return ( 
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                                            <Link to={ publicacion.linkTo }>
                                                <Card hoverable key={publicacion.id} title={ publicacion.titulo } style={ cardStyle } 
                                                    cover={ image }>
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
            </div>
        )
    }
}

export default RecetasPag;