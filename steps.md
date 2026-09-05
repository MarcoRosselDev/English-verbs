// dentro del "sql shell"
server: localhost
database: postgres
username: postgres
port: 5001
passwrd: pol.123.pol

\l
\c nombre_db_to_conect -- en este caso seria verbs
\d mostrar lista de tablas

para eliminar una base de datos aplicar > pero no tienes que estar conectado a esa base de datos y no se puede elimnar las por defecto de postgresql.
> DROP DATABASE nombre_de_tu_base;

comando para limpiar el shell de postgresql:
> \! cls

respaldo

en cdm ejecutado como administrador
nos movemos hacia atras en las carpetas con 
>cd ..
hasta llegar a C:\
y nos movemos hacia el bin de postgresql 17, asi:
>cd "C:\Program Files\PostgreSQL\17\bin"

luego ejecutamos el siguiente script:
ejemplo:
>pg_dump -U <nombre_de_usuario> -W -h <puerto_de_host> <nombre_db_x> > <ruta_output>
final:
> pg_dump -U postgres -W -h localhost -p 5001 verb_conjugator > c:\verb_conjugator.sql