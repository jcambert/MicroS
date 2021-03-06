using System;
using MicroS_Common.Domain;
using <%=appname%>.domain.<%=domain%>s.Messages.Events;
<%- include('./../../../common/templates/using') %>
/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=appname%>.domain.<%= domain%>s.Messages.Commands
{

    [OnRejected(typeof(Create<%=pascalDomain%>Rejected))]
    public class Create<%= pascalDomain%> : <%= pascalDomain%>BaseCommand
    {
        <%if(entity){%>
        public override Guid Id { get; set; }
        <%}%>
        <%-props.filter(prop=>prop.isprimitive && !prop.dynamic).map(prop=>`public ${prop.type} ${changeCase.pascalCase(prop.name)} {get;}`).join('\n') %>
        <%-props.filter(prop=>!prop.isprimitive && !prop.dynamic).map(prop=>`public List<${changeCase.pascalCase(prop.name)}> ${changeCase.pascalCase(prop.name)}s {get;}`).join('\n') %>
        <%-props.filter(prop=>prop.dynamic).map(prop=>`public Property<${prop.type}> ${changeCase.pascalCase(prop.name)} {get;}`).join('\n') %>


        public Create<%= pascalDomain%>(
            <%if(entity){%>Guid id,<%}%><%- include('./../../../common/templates/ctor') %>) : base()
        {
            <%if(entity){%>
            Id = id;
            <%}%>
            <%- include('./../../../common/templates/ctorsetprops') %>
           
        }
    }
}
