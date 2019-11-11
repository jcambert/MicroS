using System;
using MicroS_Common.Types;
namespace <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Domain
{
    public class <%= changeCase.titleCase(name) %> : BaseEntity
    {
        #region private variables
        <% props.forEach(property=>{ %><%=property.type %> _<%= property.name %> ;
        <% }) %>
        #endregion

        #region public properties
        <% props.forEach(property=> { %>
        public <%= property.type %> <%= changeCase.titleCase( property.name) %>  {get=>_<%= property.name %>;private set{_<%= property.name %>=value;}}
        <% } )%>
        #endregion

        #region Constructeur
        public <%= changeCase.titleCase(name) %>(Guid id<% props.forEach(property=> {%>,<%= property.type %> <%= changeCase.lowerCase( property.name) %><% }) %>)
            : base(id)
        {
            <% props.forEach(property=>{%>Set<%= changeCase.titleCase( property.name) %> (<%= changeCase.lowerCase( property.name)%>);
            <% }) %>
        }
        #endregion

        #region public function
        <% props.forEach(property=>{%>public void  Set<%=changeCase.titleCase(property.name)%>(<%= property.type %> <%= changeCase.lowerCase( property.name) %> )=>this.SetProperty(ref _<%= changeCase.lowerCase( property.name) %>,<%=property.name%>, () => this.SetUpdatedDate()); 
        <%})%>
        #endregion

    }
}
