export class HttpResponseWrapper<T> {
    public Error: boolean;
    public Content?: T;
    public StatusCode: number;
    constructor(data?: { Error: boolean, Content?: T, status: number }) {
        if (data) {
            this.Error = data.Error;
            this.Content = data.Content;
            this.StatusCode = data.status;
        }
    }

    public async GetMsgError(): Promise<string> {
        let errorMessage = 'Ocurrió un error desconocido';
        switch (this.StatusCode) {
            case 400:
                errorMessage = 'La solicitud es incorrecta.';
                break;
            case 401:
                errorMessage = 'No estás autorizado para acceder a este recurso.';
                break;
            case 403:
                errorMessage = 'No tienes permisos para acceder a este recurso.';
                break;
            case 404:
                errorMessage = 'El recurso solicitado no se encontró.';
                break;
            case 500:
                errorMessage = 'Ocurrió un error interno del servidor.';
                break;
            // Puedes agregar más casos según tus necesidades
        }

        return errorMessage;
    }
}