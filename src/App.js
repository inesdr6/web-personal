import React from 'react';
import InicioPag from './Components/InicioPag';
import SobreMiPag from './Components/SobreMiPag';
import AficionesPag from './Components/AficionesPag';
import MusicaPag from './Components/MusicaPag';
import RecetasPag from './Components/RecetasPag';
import PublicacionPag from './Components/PublicacionPag';
import ContactoPag from './Components/ContactoPag';
import withRouter from './Components/withRouter';
import { createClient } from '@supabase/supabase-js';
import { Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, Button } from 'antd';
import { Col, Row, Input } from 'antd';
import { HomeFilled, SmileFilled, HeartFilled, CustomerServiceFilled, StarFilled, 
    IdcardFilled, MailOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import ResultadosBusquedaPag from './Components/ResultadosBusquedaPag';

class App extends React.Component{

    constructor(props) {
        super(props)
        this.textoButton = "Ocultar lateral";
        this.state = {
            mostrarAside : true,
            isHover : [false, false, false, false, false, false, false, false, false, false, false, false, false]
        }
        this.publicaciones = null;
    
        const options = {
            schema: 'public',
            headers: { 'Web Personal Inés Díaz': 'web-personal' },
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    
        const supabase = createClient(
            'https://inzwzrbqlhmmqpkdiqol.supabase.co', 
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imluend6cmJxbGhtbXFwa2RpcW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAzMjExODIsImV4cCI6MTk4NTg5NzE4Mn0.sEbamGp6ArU2Rqkcxg2gjfW45WqLURqOvJaXHUewYiE',
            options
        )
    
        this.supabase = supabase;
        
        this.getTitulosPublicaciones();
    }    

    clickButton = async() => {
        this.setState({
            mostrarAside: !this.state.mostrarAside
        })
        if (this.state.mostrarAside) {
            this.textoButton = "Mostrar lateral";
        } else {
            this.textoButton = "Ocultar lateral";
        }
    }

    getTitulosPublicaciones = async() => {
        const { data, error } = await this.supabase
            .from('publicaciones')
            .select()
            .order('fecha_publicacion', { ascending: false })
        
        if ( error == null && data.length > 0) {
            this.publicaciones = data;
        }
    }

    mouseEnter = async(i) => {
        let array = [false, false, false, false, false, false, false, false, false, false, false, false, false];
        array[i] = true;
        this.setState({isHover: array});
    }

    mouseLeave = async() => {
        let array = [false, false, false, false, false, false, false, false, false, false, false, false, false];
        this.setState({isHover: array});
    }

    onSearch = async(value) => {
        let resultado1 = "";
        let resultado2 = "";
        let resultado3 = "";

        const { data, error } = await this.supabase
            .from('all_info_aficiones')
            .select()           
            .ilike('descripcion_general', '%' + value + '%')
        
        if (error == null) {
            for (let j = 0; j < data.length; j++) {
                resultado1 += "0" + data[j].publicacion_id;
            }
        }
        if (resultado1.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_aficiones')
            .select()           
            .ilike('titulo', '%' + value + '%')
        
            if (error == null) {
                if (resultado1.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        resultado1 += "0" + data[j].publicacion_id;
                    }
                }
                else {
                    for (let i = 0; i < resultado1.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado1.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                resultado1 += "0" + data[j].publicacion_id;
                            }
                        }
                    } 
                }
            }
        }
        if (resultado1.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_aficiones')
            .select()           
            .ilike('descripcion_imagen', '%' + value + '%')
        
            if (error == null) {
                if (resultado1.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        resultado1 += "0" + data[j].publicacion_id;
                    }
                }
                else {
                    for (let i = 0; i < resultado1.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado1.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                resultado1 += "0" + data[j].publicacion_id;
                            }
                        }
                    } 
                }
            }
        }

        if (resultado2.length == 0){
            const { data, error } = await this.supabase
            .from('all_info_musica')
            .select()           
            .ilike('descripcion_general', '%' + value + '%')
        
            if (error == null) {
                for (let j = 0; j < data.length; j++) {
                    resultado2 += "0" + data[j].publicacion_id;
                }
            }
        }
        if (resultado2.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_musica')
            .select()           
            .ilike('titulo', '%' + value + '%')
        
            if (error == null) {
                if (resultado2.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        resultado2 += "0" + data[j].publicacion_id;
                    }
                }
                else {
                    for (let i = 0; i < resultado2.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado2.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                resultado2 += "0" + data[j].publicacion_id;
                            }
                        }
                    }                     
                }
            }
        }
        if (resultado2.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_musica')
            .select()           
            .ilike('descripcion_imagen', '%' + value + '%')
        
            if (error == null) {
                if (resultado2.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        resultado2 += "0" + data[j].publicacion_id;
                    }
                }
                else {
                    for (let i = 0; i < resultado2.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado2.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                resultado2 += "0" + data[j].publicacion_id;
                            }
                        }
                    }                     
                }
            }
        }
        if (resultado2.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_musica')
            .select()           
            .ilike('albumes', '%' + value + '%')
        
            if (error == null) {
                if (resultado2.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        resultado2 += "0" + data[j].publicacion_id;
                    }
                }
                else {
                    for (let i = 0; i < resultado2.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado2.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                resultado2 += "0" + data[j].publicacion_id;
                            }
                        }
                    }                     
                }
            }
        }
        if (resultado2.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_musica')
            .select()           
            .ilike('cancion_favorita', '%' + value + '%')
        
            if (error == null) {
                if (resultado2.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        resultado2 += "0" + data[j].publicacion_id;
                    }
                }
                else {
                    for (let i = 0; i < resultado2.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado2.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                resultado2 += "0" + data[j].publicacion_id;
                            }
                        }
                    }                     
                }
            }
        }
        if (resultado2.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_musica')
            .select()           
            .ilike('descripcion_video', '%' + value + '%')
        
            if (error == null) {
                if (resultado2.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        resultado2 += "0" + data[j].publicacion_id;
                    }
                }
                else {
                    for (let i = 0; i < resultado2.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado2.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                resultado2 += "0" + data[j].publicacion_id;
                            }
                        }
                    }                     
                }
            }
        }        

        if (resultado3.length == 0){
            const { data, error } = await this.supabase
            .from('all_info_recetas')
            .select()           
            .ilike('procedimiento', '%' + value + '%')
        
            if (error == null) {
                for (let j = 0; j < data.length; j++) {
                    if (data[j].publicacion_id == 10) {
                        resultado3 += data[j].publicacion_id;
                    } else {
                        resultado3 += "0" + data[j].publicacion_id;
                    }
                }
            }
        }
        if (resultado3.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_recetas')
            .select()           
            .ilike('ingredientes', '%' + value + '%')
        
            if (error == null) {
                if (resultado3.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].publicacion_id == 10) {
                            resultado3 += data[j].publicacion_id;
                        } else {
                            resultado3 += "0" + data[j].publicacion_id;
                        }
                    }
                }
                else {
                    for (let i = 0; i < resultado3.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado3.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                if (data[j].publicacion_id == 10) {
                                    resultado3 += data[j].publicacion_id;
                                } else {
                                    resultado3 += "0" + data[j].publicacion_id;
                                }
                            }
                        }
                    }                   
                }
            }
        }
        if (resultado3.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_recetas')
            .select()           
            .ilike('titulo', '%' + value + '%')
        
            if (error == null) {
                if (resultado3.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].publicacion_id == 10) {
                            resultado3 += data[j].publicacion_id;
                        } else {
                            resultado3 += "0" + data[j].publicacion_id;
                        }
                    }
                }
                else {
                    for (let i = 0; i < resultado3.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado3.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                if (data[j].publicacion_id == 10) {
                                    resultado3 += data[j].publicacion_id;
                                } else {
                                    resultado3 += "0" + data[j].publicacion_id;
                                }
                            }
                        }
                    }                    
                }
            }
        }
        if (resultado3.length < 4) {
            const { data, error } = await this.supabase
            .from('all_info_recetas')
            .select()           
            .ilike('descripcion_imagen', '%' + value + '%')
        
            if (error == null) {
                if (resultado3.length == 0) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].publicacion_id == 10) {
                            resultado3 += data[j].publicacion_id;
                        } else {
                            resultado3 += "0" + data[j].publicacion_id;
                        }
                    }
                }
                else {
                    for (let i = 0; i < resultado3.length; i += 2) {
                        for (let j = 0; j < data.length; j++) {
                            if (resultado3.substring(i, i+2) != "0" + data[j].publicacion_id) {
                                if (data[j].publicacion_id == 10) {
                                    resultado3 += data[j].publicacion_id;
                                } else {
                                    resultado3 += "0" + data[j].publicacion_id;
                                }
                            }
                        }
                    }                   
                }
            }
        }

        let string = resultado1 + resultado2 + resultado3;

        window.location = "/resultadosbusqueda/" + string;
    }
  
    render() {
        const { Search } = Input;
        const { Header, Footer, Sider, Content } = Layout;
        const styleSider = {
            padding: '1.5rem', 
            margin: '2.7rem 1.2rem 0.5rem 0rem'
        };
        const styleNoneDisplay = {
            display: 'none'
        };

        return (
            <Layout className="layout">
                <Header>
                    <Row>
                        <Col xs= {18} sm={19} md={20} lg={21} xl = {22}>
                            <Menu theme="dark" mode="horizontal" items={[
                                { key:"logo", label: <Link to="/web-personal"><img src={process.env.REACT_APP_SUPBASE_STORAGE + "logo.png"} width="45" height="45" /></Link>},
                                { key:"menuInicio", label: <Link to="/web-personal">Inicio</Link>, icon: <HomeFilled />},
                                { key:"menuSobreMi", label: <Link to="/sobremi">Sobre mi</Link>, icon: <SmileFilled />},
                                { key:"menuAficiones", label: <Link to="/aficiones">Aficiones</Link>, icon: <HeartFilled />},
                                { key:"menuMusica", label: <Link to="/musica">Música</Link>, icon: <CustomerServiceFilled />},
                                { key:"menuRecetas", label: <Link to="/recetas">Recetas</Link>, icon: <StarFilled />},
                                { key:"menuContacto", label: <Link to="/contacto">Contacto</Link>, icon: <IdcardFilled />},
                            ]} >
                            </Menu>
                        </Col>
                        <Col xs= {6} sm={5} md = {4}  lg = {3} xl = {2} style={{display: 'flex', flexDirection: 'row-reverse' }}>
                            <Button type="dashed" ghost style={{margin: '1rem'}} 
                            onClick={() => this.clickButton()}>
                                {this.textoButton}
                            </Button>
                        </Col>
                    </Row>
                </Header>

                <Layout>

                    <Content style={{ padding: '2.7rem 3.2rem 0.5rem' }}>
                        <div className="site-layout-content">
                            <Row>
                                <Col span={24}>
                                    <Routes>
                                        <Route path="/web-personal" element={ 
                                            <InicioPag supabase={this.supabase}/> 
                                        } />
                                        <Route path="/sobremi" element={ 
                                            <SobreMiPag supabase={this.supabase}/> 
                                        } />
                                        <Route path="/aficiones" element={ 
                                            <AficionesPag supabase={this.supabase}/> 
                                        } />
                                        <Route path="/musica" element={ 
                                            <MusicaPag supabase={this.supabase}/> 
                                        } />
                                        <Route path="/recetas" element={ 
                                            <RecetasPag supabase={this.supabase}/> 
                                        } />
                                        <Route path="/:categoria/:id" element={ 
                                            <PublicacionPag supabase={this.supabase}/> 
                                        } />
                                        <Route path="/contacto" element={ 
                                            <ContactoPag supabase={this.supabase}/> 
                                        } />
                                        <Route path="/resultadosbusqueda/:string" element={
                                            <ResultadosBusquedaPag supabase={this.supabase}/>
                                        } />
                                    </Routes>
                                </Col>
                            </Row>
                        </div>
                    </Content>

                    <Sider theme='light' width={270} style={this.state.mostrarAside? styleSider : styleNoneDisplay}>
                        <p><b>Búsqueda</b></p>
                        <p><Search placeholder="Introduce el texto" onSearch={(value) => this.onSearch(value)} enterButton /></p>
                        <br/>
                        <p><b>Categoría</b></p>
                        <ul style={{listStyle: 'none'}}>
                            <li><Link to="/aficiones" style={{color: this.state.isHover[0] ? '#0000ff' : '#444444'}} 
                            onMouseEnter={() => this.mouseEnter(0)} 
                            onMouseLeave={() => this.mouseLeave()}>Aficiones</Link></li>
                            <li><Link to="/musica" style={{color: this.state.isHover[1] ? '#0000ff' : '#444444'}} 
                            onMouseEnter={() => this.mouseEnter(1)} 
                            onMouseLeave={() => this.mouseLeave()}>Música</Link></li>
                            <li><Link to="/recetas" style={{color: this.state.isHover[2] ? '#0000ff' : '#444444'}} 
                            onMouseEnter={() => this.mouseEnter(2)} 
                            onMouseLeave={() => this.mouseLeave()}>Recetas</Link></li>
                        </ul>
                        <p><b>Últimas publicaciones</b></p>
                        <ul style={{listStyle: 'none'}}>
                            {this.publicaciones?.map(publicacion => 
                            <li ><Link to={"/"+publicacion.categoria+"/"+publicacion.id} 
                            style={{color: this.state.isHover[publicacion.id + 2] ? '#0000ff' : '#444444'}} 
                            onMouseEnter={() => this.mouseEnter(publicacion.id + 2)} onMouseLeave={() => this.mouseLeave()}>{publicacion.titulo}</Link></li>)}
                        </ul>
                    </Sider>

                </Layout>
            
                <Footer style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.6rem', borderBottom: '0.01rem solid', borderColor: '#999999', padding: '1rem 0', margin: '0 1rem 1rem 1rem'}}>
                        <Link to="/contacto" style={{color: '#000000'}}>
                            <MailOutlined style={{ padding: '0 1rem'}}/>
                        </Link> | <Link to="/contacto" style={{color: '#000000'}}>
                            <InstagramOutlined style={{ padding: '0 1rem'}}/>
                        </Link> | <Link to="/contacto" style={{color: '#000000'}}>
                            <TwitterOutlined style={{ padding: '0 1rem'}}/>
                        </Link>
                    </p>           
                    <p>&copy; Inés Díaz del Rey</p>
                </Footer>
            </Layout>
        );

    }
}

export default withRouter(App);