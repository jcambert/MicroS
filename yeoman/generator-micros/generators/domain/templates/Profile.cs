using AutoMapper;
using <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Domain;
using <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Dto;
<%if(crud){%>
using <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Commands;
using <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Messages.Events;
<%}%>
namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name)%>s.Mapping
{
    public class <%= changeCase.pascalCase(name)%>Profile:Profile
    {
        public <%= changeCase.pascalCase(name)%>Profile()
        {
            CreateMap<<%= changeCase.pascalCase(name)%>, <%= changeCase.pascalCase(name)%>Dto>().ConstructUsing(e => new <%= changeCase.pascalCase(name)%>Dto() {<%if(base_entity){%> Id = e.Id<%}%><%props.forEach( (property,index)=>{%><%if(base_entity || index>0){%>,<%}%><%=changeCase.pascalCase(property.name) %> = e.<%=changeCase.pascalCase(property.name) %><%}) %>  });
            <%if(crud){%>
            CreateMap<Create<%= changeCase.pascalCase(name)%>, <%= changeCase.pascalCase(name)%>>().ConstructUsing(e => new <%= changeCase.pascalCase(name)%>(e.Id<% props.forEach(property=>{%>,e.<%=changeCase.pascalCase(property.name) %><%}) %>));
            CreateMap<Create<%= changeCase.pascalCase(name)%>, <%= changeCase.pascalCase(name)%>Created>().ConstructUsing(e => new <%= changeCase.pascalCase(name)%>Created(e.Id<% props.forEach(property=>{%>,e.<%=changeCase.pascalCase(property.name) %><%}) %>));
            CreateMap<Update<%= changeCase.pascalCase(name)%>, <%= changeCase.pascalCase(name)%>Updated>().ConstructUsing(e => new <%= changeCase.pascalCase(name)%>Updated(e.Id<% props.forEach(property=>{%>,e.<%=changeCase.pascalCase(property.name) %><%}) %>));
            CreateMap<Delete<%= changeCase.pascalCase(name)%>, <%= changeCase.pascalCase(name)%>Deleted>().ConstructUsing(e => new <%= changeCase.pascalCase(name)%>Deleted(e.Id));            
            <%}%>
        }
    }
}
