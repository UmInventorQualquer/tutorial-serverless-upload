# Tutorial Upload Serverless

Este tutorial foi criado como complementação ao vídeo tutorial do canal do YouTube
[Um Inventor Qualquer](https://www.youtube.com/c/UmInventorQualquer).

Neste tutorial vamos abordar uma metodologia de upload serverless para paralelizar o upload de arquivos e evitar
o consumo de banda e threads de APIs de dados assim como relatado no vídeo
[TOP 5 Erros mais cometidos em API REST](https://youtu.be/MupqhyGfuyg).

Esta solução utiliza uma função no AWS Lambda consultada através do AWS API Gateway para gerar uma pre-signed URL
para permitir ao browser de um usuário do sistema fazer upload seguro de arquivos diretamente para um bucket do
AWS S3.

Assista ao vídeo em https://www.youtube.com/watch?v=N5dtRX2PWHY

[Clique aqui para acessar o tutorial na versão texto](docs/README.md)

