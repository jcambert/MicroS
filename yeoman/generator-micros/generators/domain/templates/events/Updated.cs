using System;
using System.Collections.Generic;
<%- props.filter(prop=>!prop.isprimitive).map(prop=>`using ${namespace}.domain.${prop.name}s.Domain;`).join('\n') %>
/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events
{
    public class <%= changeCase.pascalCase(name)%>Updated : <%= changeCase.pascalCase(name)%>Created
    {
        public <%= changeCase.pascalCase(name)%>Updated(Guid id,<%- props.filter(prop=>prop.isprimitive).map(prop=>`${prop.type} ${changeCase.lowerCase(prop.name)}`).concat(props.filter(prop=>!prop.isprimitive).map(prop=>`List<${prop.name}> ${changeCase.lowerCase(prop.name)}s`)).join(',') %>) 
        : base(id,<%- props.filter(prop=>prop.isprimitive).map(prop=>`${changeCase.lowerCase(prop.name)}`).concat(props.filter(prop=>!prop.isprimitive).map(prop=>`${changeCase.lowerCase(prop.name)}s`)).join(',') %>)
        {
        }
    }
}
