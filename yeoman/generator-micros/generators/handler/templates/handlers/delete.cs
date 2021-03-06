using AutoMapper;
using MicroS_Common.Handlers;
using MicroS_Common.RabbitMq;
using MicroS_Common.Types;
using MicroS_Common.Mongo;
using System;
using System.Threading.Tasks;
using <%=appname%>.domain.<%= domain %>s.Domain;
using <%=appname%>.domain.<%= domain %>s.Messages.Commands;
using <%=appname%>.domain.<%= domain %>s.Messages.Events;
using <%=service.name%>.Repositories;

/// <summary>
/// This file was generated by the yeoman generator "generator-micros"
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=service.name%>.Handlers
{


    /// <summary>
    /// Delete <%= pascalDomain %> Handler
    /// </summary>
    public partial class Delete<%= pascalDomain %>Handler : DomainCommandHandler<Delete<%= pascalDomain %>, <%= pascalDomain %>>
    {
        #region Constructors
        public Delete<%= pascalDomain %>Handler(
            IBusPublisher busPublisher, 
            IMapper mapper, 
            IBrowse<%= pascalDomain %>Repository repository) : base(busPublisher, mapper, repository)
        {
        }
        #endregion
        #region Protected Overrides functions
        /// <summary>
        /// Check if the model exist by Command
        /// </summary>
        /// <param name="command">The command in wich information can be use do check if the model exist in database</param>
        /// <returns>Nothing</returns>
        protected override async Task<bool> CheckExist(Guid id)
        {
            if (!await base.CheckExist(id))
            {
                throw new MicroSException("<%= domain %>_not_found",$"<%= pascalDomain %>: '{id}'  was not found.");
            }
            return true;
        }
        #endregion

        #region Public Overrides functions
        /// <summary>
        ///  Handle the command with context
        /// </summary>
        /// <param name="command">The command to handle</param>
        /// <param name="context">The correlation context</param>
        /// <returns></returns>
        public override async Task HandleAsync(Delete<%= pascalDomain %> command, ICorrelationContext context)
        {
            await base.HandleAsync(command, context);
            await Repository.DeleteAsync(command.Id);
            await BusPublisher.PublishAsync(CreateEvent<<%= pascalDomain %>Deleted>(command) , context);

        }
        #endregion
    }
}
