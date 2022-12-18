import React from 'react';
import { PageHeader, Image, Descriptions, Typography } from 'antd';

class SobreMiPag extends React.Component {

    render() {
        const imgStyle = {
            width: "50%",
            height: "100%"
        };
        const { Title } = Typography;
        
        return ( 
            <PageHeader ghost={false}>
                    <Descriptions>
                        <Descriptions.Item span={3}><Title level={4}>Inés Díaz del Rey</Title></Descriptions.Item>
                        <Descriptions.Item span={3}>
                            <Image src={process.env.REACT_APP_SUPBASE_STORAGE + "/me.png"} alt={"Imagen de Inés Díaz del Rey."} style={imgStyle}/>
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>
                        Soy una chica de 22 años de la localidad de Pozoblanco, Córdoba. Cursé mi grado de Ingeniería de la Salud 
                        con especialidad en Bioinformática en la Universidad de Málaga. Actualmente, estoy cursando un Máster en 
                        Ingeniería Web en la Universidad de Oviedo y tengo ambiciones de trabajar en este ámbito. Adoro vivir 
                        nuevas experiencias y estar en un continuo aprendizaje. Me considero una persona trabajadora y responsable 
                        que se implica en lo que se propone.     
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
        )
    }
}

export default SobreMiPag;