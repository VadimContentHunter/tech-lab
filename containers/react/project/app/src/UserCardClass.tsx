import { Component, JSX, useState } from 'react';

type OptionCardProps = {
    nameProp?: string;
    emailProp?: string;
    ageProp?: number;
    isActiveProp?: boolean;
};

type CardProps = {
    children: React.ReactNode;
};

class UserCardClass extends Component<OptionCardProps> {
    override state = {
        description: '',
        email: this.props.emailProp || '-----',
        age: this.props.ageProp ?? 0,
        isActive: this.props.isActiveProp ?? false,
    };

    messageEmailError = 'Email должен содержать символ @.';
    messageAgeError = 'Пожалуйста, введите корректный возраст. Должно быть положительное число.';

    handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        this.setState({ email: newEmail });
        if (!newEmail.includes('@')) {
            this.setState({ description: this.messageEmailError });
        } else {
            this.setState({ description: '' });
        }
    };

    handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAge = parseInt(event.target.value, 10);
        if (isNaN(newAge) || newAge < 1) {
            this.setState({ description: this.messageAgeError });
            this.setState({ age: 0 });
        } else {
            this.setState({ description: '' });
            this.setState({ age: newAge });
        }
    };

    handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ isActive: event.target.checked });
    };

    clear = () => {
        this.setState({ email: '' });
        this.setState({ age: 0 });
        this.setState({ isActive: false });
        this.setState({ description: '' });
    };

    renderUserInfo(): JSX.Element {
        return (
            <div className="user-info">
                <h2>{this.props.nameProp}</h2>
                <br></br>

                {this.state.description.trim().length > 0 && <p>{this.state.description}</p>}

                <p>
                    Email: <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                </p>
                <p>
                    Age: <input type="number" value={this.state.age} onChange={this.handleAgeChange} />
                </p>
                <p>
                    Status: <input type="checkbox" checked={this.state.isActive} onChange={this.handleIsActiveChange} />{' '}
                    {this.state.isActive ? 'Active' : 'Inactive'}
                </p>

                <button onClick={this.clear}>Clear</button>
            </div>
        );
    }

    renderPackage({ children }: CardProps): JSX.Element {
        return <div className="card">{children}</div>;
    }

    override render(): JSX.Element {
        return this.renderPackage({ children: this.renderUserInfo() });
    }
}

export default UserCardClass;
