import React from 'react';
import { Button, TextInput, HelperText, Switch } from 'react-native-paper';
import { View, Image, Text } from 'react-native';
import { LoginServices } from '../modules/services/login.service';

export default function Dashboard({ route, navigation }) {
    const [state, setState] = React.useState({
        token: false,
        loged: false,
        isSwitchOn: false,
        email: '',
        password: '',
    });

    async function Login() {
        const response = await LoginServices({ email: state.email, password: state.password });
        if (response.token) {
            setState((prevState) => ({ ...prevState, loged: true }));
            return navigation.navigate('Dashboard');
        } else {
            setState((prevState) => ({ ...prevState, token: true }))
            setTimeout(() => {
                setState((prevState) => ({ ...prevState, token: false }))
            }, 2000);
        }
    }

    const onToggleSwitch = React.useCallback(() => { setState((prevState) => ({ ...prevState, isSwitchOn: !state.isSwitchOn })), [state.isSwitchOn] })

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 15,
                backgroundColor: '#fff',
            }}
        >
            <Image
                source={require('../assets/logo_eletriza_preto_curto.png')}
                style={{ height: 80, width: '100%' }}
            />
            <TextInput
                style={{ width: '80%', backgroundColor: '#fff' }}
                label="Email"
                value={state.email}
                onChangeText={(text) =>
                    setState((prevState) => ({ ...prevState, email: text }))
                }
                type="outlined"
                autoFocus
            />
            <TextInput
                style={{ width: '80%', backgroundColor: '#fff' }}
                label="Password"
                value={state.password}
                onChangeText={(text) =>
                    setState((prevState) => ({ ...prevState, password: text }))
                }
                type="outlined"
            />
            <Button
                style={{ width: 300, backgroundColor: '#111' }}
                mode="contained"
                onPress={Login}
            >
                Login
            </Button>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text>Lembrar</Text>
                <Switch value={!state.isSwitchOn} onValueChange={onToggleSwitch} color='#111' />
            </View>
            <HelperText type="error" visible={state.token}>
                Credencial inválida
            </HelperText>
            <HelperText type="info" visible={state.loged} style={{ color: 'green' }}>
                Logado com sucesso
            </HelperText>
        </View>
    );
}