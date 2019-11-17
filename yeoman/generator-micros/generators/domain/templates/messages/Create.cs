using System;

namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Commands
{

    public class Create<%= changeCase.pascalCase(name)%> : <%= changeCase.pascalCase(name)%>BaseCommand
    {
        <%if(base_entity){%>
        public override Guid Id { get; set; }
        <%}%>
        <%props.forEach(property=>{
            %>public <%= property.type%>  <%= changeCase.pascalCase(property.name)%>{get;}
        <%})%>



        public Create<%= changeCase.pascalCase(name)%>(<%if(base_entity){%>Guid id<%}%><%props.forEach(property=>{%>,<%=property.type%> <%=changeCase.lowerCase( property.name)%> <%})%>) : base()
        {
            <%if(base_entity){%>
            Id = id;
            <%}%>
            <%props.forEach(property=>{%><%=changeCase.pascalCase(property.name) %> = <%= changeCase.lowerCase(property.name) %> ;
            <%}) %>
        }
    }
}
