using System;
using MicroS_Common.Types;
namespace <%=namespace%>.domain.<%= changeCase.pascalCase(name) %>s.Domain
{
    public class <%= changeCase.pascalCase(name) %> <%if(base_entity){%> :BaseEntity<%}%>
    {
        <%if(base_entity){%>
        #region private variables
        <% props.forEach(property=>{ %><%=property.type %> _<%= changeCase.lowerCase( property.name) %> ;
        <% }) %>
        #endregion

        #region public properties
        <% props.forEach(property=> { %>
        public <%= property.type %> <%= changeCase.pascalCase( property.name) %>  {get=>_<%= property.name %>;private set{_<%= property.name %>=value;}}
        <% } )%>
        #endregion

        #region Constructeur
        public <%= changeCase.pascalCase(name) %>(Guid id<% props.forEach(property=> {%>,<%= property.type %> <%= changeCase.lowerCase( property.name) %><% }) %>)
            : base(id)
        {
            <% props.forEach(property=>{%>Set<%= changeCase.pascalCase( property.name) %> (<%= changeCase.lowerCase( property.name)%>);
            <% }) %>
        }
        #endregion

        #region public function
        <% props.forEach(property=>{%>public void  Set<%=changeCase.pascalCase(property.name)%>(<%= property.type %> <%= changeCase.lowerCase( property.name) %> )=>this.SetProperty(ref _<%= changeCase.lowerCase( property.name) %>,<%=property.name%>, () => this.SetUpdatedDate()); 
        <%})%>
        #endregion

        <%}else{%>
        #region public properties
        <% props.forEach(property=> { %>
        public <%= property.type %> <%= changeCase.pascalCase( property.name) %>  {get;set;}
        <% } )%>
        #endregion

        <%}%>

    }
}
