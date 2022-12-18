import React from 'react';
import { Card } from 'antd';
import { MailOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

class ContactoPag extends React.Component {

    render() {
        const cardStyle = {
            height: "100%"
        };
        
        return ( 
            <Card title={ "Contacto" } style={ cardStyle }>
                <p><MailOutlined /> inesdiazdelrey@gmail.com</p>
                <p><InstagramOutlined /> inesdr6</p>
                <p><TwitterOutlined /> inesdr6</p>
            </Card>
        )
    }
}

export default ContactoPag;