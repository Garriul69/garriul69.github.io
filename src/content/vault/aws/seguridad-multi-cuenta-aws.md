---
title: "Seguridad en ambientes multi-cuenta AWS"
description: "SCP, IAM, Control Tower y arquitectura de cuentas."
date: 2023-08-14
tags: ["aws","multi-cuenta","scp"]
---

Para poder empezar a ver este tipo de ambiente que es el multi-cuenta, primero debemos ver algunas diferencias entre ellas, como las cuales se muestran en la siguiente imagen:
![Pasted image 20230811212022](/vault-imgs/Pasted%20image%2020230811212022.png)
Todo esto parte de las organizaciones de AWS el cual siempre viene apoyado del AWS control tower.

![Pasted image 20230811212522](/vault-imgs/Pasted%20image%2020230811212522.png)

Como podemos ver en la imagen el hecho de tener esta segmentación ayuda a poder tener un mejor control sobre cada cuenta ya que cada cuenta debe cumplir con un propósito, ya que así mismo podemos consolidar mejor los gastos y separarlos por unidad organizacional, también podemos segmentar el trabajo de cada persona.

Después de saber esto, vienen las políticas sobre cada UO (Unidad Organizativa), donde en cada UO  vienen las cuentas, ejemplo, las cuentas pertenecen a una UO, entonces cada UO puede tener recursos AWS, donde a continuación se explica que tipo de recursos puede tener, en este caso se delegan los recursos según sea el objetivo de la UO.

En este caso hablaremos de las **Service Control Polices** las cuales nos van a ayudar a pode limitar ciertas acciones de las cuentas que se encuentran dentro de una UO o así mismo dentro todo lo que esté dentro de la cuenta raíz, podemos ver de forma más detallada todo lo que se explicó anteriormente en la siguiente imagen.

![Pasted image 20230811213514](/vault-imgs/Pasted%20image%2020230811213514.png)

Una cosas que debemos saber sobre los permisos es lo siguiente, hay permisos otorgados por IAM (Identity adn Access Managment), y hay otros permisos otorgados por SCP (Service Control Polices), donde podemos decir que IAM se encarga de gestionar el acceso a los recursos y SCP se encarga de restringir ciertos recursos.

**Service Control Policies (SCP) en AWS:**

Las SCP son políticas de control de servicios que se utilizan en AWS Organizations para establecer restricciones en las cuentas de AWS dentro de una organización. Las SCP se aplican a nivel de la organización y se utilizan para limitar las acciones que las cuentas de AWS pueden realizar en términos de servicios y recursos específicos. Algunas características clave de las SCP son:

1. **Alcance Organizacional**: Las SCP se aplican a todas las cuentas dentro de una organización de AWS, incluidas las cuentas miembro.
    
2. **Restricciones de Servicios**: Las SCP permiten habilitar o deshabilitar servicios de AWS específicos. Por ejemplo, puedes bloquear el acceso a servicios que no sean esenciales para tu organización.
    
3. **Restricciones de Acciones**: Puedes limitar las acciones que los usuarios pueden realizar en los servicios de AWS, como crear instancias EC2 o eliminar recursos.
    
4. **Prioridad Jerárquica**: Las SCP se aplican en cascada, lo que significa que las políticas en niveles superiores pueden anular o agregar restricciones a las políticas en niveles inferiores.
    

**Identity and Access Management (IAM) en AWS:**

IAM es un servicio de AWS que te permite gestionar el acceso a los recursos y servicios de AWS de manera segura. IAM se centra en controlar quiénes son los usuarios autenticados y autorizados y qué acciones específicas pueden realizar en los recursos. Algunas características clave de IAM son:

1. **Gestión de Identidades**: IAM permite crear y gestionar identidades, como usuarios, grupos y roles, y asignarles credenciales de acceso.
    
2. **Políticas de Permiso**: Puedes crear políticas de permiso detalladas que especifican qué acciones pueden realizar las identidades en recursos específicos.
    
3. **Granularidad de Acceso**: IAM proporciona un alto grado de control sobre los permisos, lo que te permite otorgar acceso solo a las acciones y recursos necesarios.
    
4. **Acceso a Nivel de Recurso**: IAM se aplica a nivel de recurso, lo que significa que controla las acciones que un usuario puede realizar en un recurso específico (por ejemplo, permitir a un usuario detener una instancia EC2 en particular).
    

En resumen, las SCP se centran en establecer restricciones a nivel de servicio y son aplicables a nivel organizacional, mientras que IAM se centra en la gestión de identidades y permisos a nivel de usuario o recurso específico. Ambos son componentes cruciales para garantizar la seguridad y el control en el entorno de AWS, pero tienen enfoques y aplicaciones diferentes.

Donde podemos diferenciar unas cosas con el diagrama que se muestra en la siguiente imagen.

La SCP puede decirle a IAM que puede otorgarle permisos a cierta UO sobre algún servicio o recurso, pero si IAM no tiene configurado que permita cierto servicio o recurso este no será valido, por ejemplo:

SCP dice que puede permitir a una instancia EC2 y una S3, pero si IAM dice que solo permite EC2 y SQS lo que pasará al final es que solo se le asignará ya sea a la UO o a la cuenta el recurso EC2, como se muestra ilustrado en las siguientes imágenes.

![Pasted image 20230811220204](/vault-imgs/Pasted%20image%2020230811220204.png)

![Pasted image 20230811220446](/vault-imgs/Pasted%20image%2020230811220446.png)

Con esto podemos comprender un poco más sobre IAM y SCP.
Otra funcionalidad de las SCP es que podemos restringir ciertos servicios, por ejemplo, si decidimos que en USA no se utilizan ciertos servicios para las cuentas o corporativos de allá, ¿por qué permitir que se usen?, estos solo puede ocasionar un problema a nosotros y permitir que cualquier atacante pueda montar una infraestructura con las credenciales de alguien que tenga acceso a ciertos recursos y que mejor que limitar los recursos en regiones donde sabemos que no será utilizadas.

A continuación se deja la documentación sobre más SCP.

![Pasted image 20230811221043](/vault-imgs/Pasted%20image%2020230811221043.png)

### Cuenta maestra

Hablemos de la cuenta maestra en AWS, la "cuenta maestra" se refiere a la cuenta principal y primaria que se crea cuando configuras una organización de AWS utilizando el servicio de AWS Organizations. Esta cuenta maestra es el punto central de control para administrar y organizar todas las cuentas asociadas dentro de tu organización. Lo mejor es que esta cuenta no se utilice día con día, lo mejor es que esta solo sea ocupada para las SCP, controles de acceso, consolidación de facturación, y más, como se muestra en la imagen.

![Pasted image 20230811221845](/vault-imgs/Pasted%20image%2020230811221845.png)

### Cuenta Logging

Una manera de asegurar los logs es centralizarlos, es decir en cada cuenta los logs lo enviamos a la cuenta de logging para que nadie pueda eliminar o comprometer los logs.

![Pasted image 20230811223529](/vault-imgs/Pasted%20image%2020230811223529.png)

### Cuenta de seguridad y auditoría

Podemos tener una cuenta de seguridad y auditoría donde podemos desplegar ciertos servicios como se muestra en la siguiente imagen.

![Pasted image 20230811223630](/vault-imgs/Pasted%20image%2020230811223630.png)

### Cuenta de redes

Aquí el objetivos es tener las conexiones entre redes, todo lo que tenga que ver con administración de redes.

![Pasted image 20230811223848](/vault-imgs/Pasted%20image%2020230811223848.png)

### Servicios compartidos

Aquí se despliegan los recursos compartidos entre toda la infraestructura multi-cuenta, por ejemplo algunos servicios como DNS, Active Directory, LDAP, etc.

![Pasted image 20230811224323](/vault-imgs/Pasted%20image%2020230811224323.png)

Podemos ver como podemos ir segmentando las cuentas múltiples, que de esta manera podemos ver las cuentas de desarrollo.
Este es un esquema de un buen despliegue de múltiples cuentas.

![Pasted image 20230811224619](/vault-imgs/Pasted%20image%2020230811224619.png)

Podemos ver que todo está centralizado a la cuenta de logging para que podamos ahí mismo guardar todo.

---

### GuardRails

Los GuardRails son una herramienta que nos puede ayudara tener ciertas precauciones y al igual nos puede ayudar a detectar violación de políticas de seguridad y esta misma nos alerta, como en el caso de tener un puerto 3389 abierto al mundo, como ejemplos:

![Pasted image 20230814074824](/vault-imgs/Pasted%20image%2020230814074824.png)

### Servicios de seguridad integrados con AWS Organizations

![Pasted image 20230814075637](/vault-imgs/Pasted%20image%2020230814075637.png)

#### AWS Security Hub

Esta herramienta nos ayuda a gestionar las amenazas que detecten los demás servicios y nos genera un reporte, a su misma vez esta información viene consolidada y nos prioriza estos hallazgo dependiendo su gravedad, así mismo podemos configurar este servicios para que nos llegue la notificación mediante correo, chat, recordemos que este solo recopila los hallazgos de los demás servicios como Amazon GuardDuty, Amazon Inspector, Amazon Macie, etc.

![Pasted image 20230814081202](/vault-imgs/Pasted%20image%2020230814081202.png)

#### AWS Firewall Manager

#### Amazon GuardDuty

Detección de amenaza contra hackeo, es un servicios que detecta anomalías como si fuera un comportamiento inusual del usuario, este no utiliza ningún agente así que no afecta el perfomance y rendimiento de los demás servicios, este estará mirando la metadata del tráfico, checa los DNS para ver a donde se quisieron conectar las instancias, también monitoreo el plano de datos de S3 como la eliminación de datos masiva.

![Pasted image 20230814080001](/vault-imgs/Pasted%20image%2020230814080001.png)

![Pasted image 20230814081320](/vault-imgs/Pasted%20image%2020230814081320.png)

![Pasted image 20230814081505](/vault-imgs/Pasted%20image%2020230814081505.png)

#### Amazon Macie

Este es el encargado sobre la seguridad del servicios S3 (contenedor de almacenamiento), donde podemos ver si la información que está dentro está cifrada o no, cual S3 se está compartiendo con los demás, cuales están abiertos al público, etc.

![Pasted image 20230814082229](/vault-imgs/Pasted%20image%2020230814082229.png)

#### AWS IAM Access Analyzer

Esta herramienta nos ayuda a identificar y evaluar los posibles problemas de acceso en tus políticas de permisos de AWS Identity and Access Management (IAM) y en las políticas de recursos compartidos en Amazon S3 (buckets y objetos) y KMS (Key Management Service) en tus cuentas de AWS.

La función principal de AWS IAM Access Analyzer es analizar las políticas de acceso y los recursos compartidos en busca de posibles brechas de seguridad o configuraciones no intencionadas que podrían permitir el acceso no autorizado a tus recursos. Algunas de las características clave de AWS IAM Access Analyzer son:

1. **Análisis de Políticas**: IAM Access Analyzer analiza las políticas de acceso de IAM y las políticas de recursos compartidos en busca de posibles problemas, como permisos excesivos o permisos insuficientes.
    
2. **Generación de Informes de Acceso**: Proporciona informes detallados sobre cómo los recursos son accesibles para entidades y servicios en tus cuentas de AWS.
    
3. **Recomendaciones de Acceso**: Ofrece recomendaciones sobre cómo puedes ajustar tus políticas de acceso para reducir riesgos y mejorar la seguridad.
    
4. **Integración con AWS Organizations**: Puedes habilitar IAM Access Analyzer a nivel de organización de AWS para analizar las políticas en todas las cuentas de la organización.
    
5. **Visualización de Recursos Compartidos**: Puedes ver cómo los recursos compartidos son accesibles desde cuentas diferentes, lo que te permite comprender mejor cómo se propagan los permisos en tu entorno.
    
6. **Validación de Cambios**: Puedes utilizar IAM Access Analyzer para validar los cambios propuestos en las políticas de acceso antes de aplicarlos.
    
7. **Integración con AWS CloudTrail**: Puede utilizarse junto con AWS CloudTrail para auditar y registrar cambios en las políticas de acceso a lo largo del tiempo.
    
8. **Compatibilidad con Lenguaje de Política Común (CPL)**: Soporta el Lenguaje de Política Común (CPL) para proporcionar análisis más avanzados y detallados de las políticas de acceso.

![Pasted image 20230814082629](/vault-imgs/Pasted%20image%2020230814082629.png)
